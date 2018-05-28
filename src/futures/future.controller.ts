import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateFutureDto } from './create-future.dto';
import { FutureService } from './future.service';
import { Future } from './future.interface';

@Controller('future')
export class FutureController {

  constructor(private readonly futureService: FutureService) { }

  @Get()
  async findAll(): Promise<Future[]> {
    return this.futureService.findAll();
  }

  @Post()
  async create( @Body() createFutureDto: CreateFutureDto) {
    return this.futureService.generateFuture(createFutureDto);
  }

  @Delete(':futureId')
  delete( @Param('futureId') futureId) {
    return this.futureService.deleteOne(futureId);
  }

  @Get(':futureId')
  findOne(@Param('futureId') futureId) {
    return this.futureService.findOne(futureId);
  }
}
