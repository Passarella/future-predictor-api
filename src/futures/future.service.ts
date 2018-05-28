import { Component, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';


import { CreateFutureDto } from './create-future.dto';
import { Future } from './future.interface';
import { Possibilities } from './future.enum';

@Component()
export class FutureService {
  constructor( @Inject('FutureRepositoryToken') private readonly futureRepository: Repository<Future>) { }

  async findAll(): Promise<Future[]> {
    try {
      return await this.futureRepository.find();
    } catch (err) {
      return err;
    }
  }

  async findOne(futureId): Promise<Future> {
    try {
      return await this.futureRepository.findOne(futureId);
    } catch (err) {
      return err;
    }
  }

  async create(future: Future): Promise<Future> {
    try {
      return await this.futureRepository.save(future);
    } catch (err) {
      return err;
    }
  }

  async deleteOne(futureId: string) {
    try {
      return await this.futureRepository.removeById(futureId);
    } catch (err) {
      return err;
    }
  }

  async generateFuture(createFutureDto: CreateFutureDto) {
    try {
      const percentage: number = Math.floor(Math.random() * (100));
      const selectPossibility: number = Math.floor(Math.random() * (100));
      const number: number = Math.floor(Math.random() * (9999));
      const days: number = Math.floor(Math.random() * (3));
      const dayMonthYear: Array<string> = ['days', 'months', 'years'];
      const name: string = createFutureDto.name;
      let literal: string = dayMonthYear[days].replace('s', '');
      console.log(Possibilities, 'Possibilities', selectPossibility, 'Possibilidade selecionada');

      if (days <= 1) {
        literal = dayMonthYear[days];
      }

      const description: string = 'You will ' + Possibilities[selectPossibility] +
        ' in ' + number + ' ' + literal + ' !';
      const id: string = uuid();
      const newFuture = Object.assign({}, createFutureDto, {
        id,
        result: Possibilities[selectPossibility],
        description,
        percentage,
        name
      });

      return await this.create(newFuture);
    } catch (err) {
      return err;
    }
  }

}
