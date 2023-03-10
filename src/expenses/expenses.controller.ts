import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ExpensesService } from './expenses.service';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { OwnerExpenseDto } from './dto/owner-expense.dto';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('expenses')
export class ExpensesController {
  constructor(private readonly expensesService: ExpensesService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Body() createExpenseDto: CreateExpenseDto,
    @Req() req: { user: OwnerExpenseDto },
  ) {
    return this.expensesService.create(createExpenseDto, req.user);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Req() req: { user: OwnerExpenseDto }) {
    return this.expensesService.findAll(req.user);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string, @Req() req: { user: OwnerExpenseDto }) {
    return this.expensesService.findOne(+id, req.user);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateExpenseDto: UpdateExpenseDto,
    @Req() req: { user: OwnerExpenseDto },
  ) {
    return this.expensesService.update(+id, updateExpenseDto, req.user);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: { user: OwnerExpenseDto }) {
    return this.expensesService.remove(+id, req.user);
  }
}
