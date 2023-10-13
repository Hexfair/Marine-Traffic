import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ParserService } from './parser.service';
import { CreateParserDto } from './dto/create-parser.dto';
import { UpdateParserDto } from './dto/update-parser.dto';

@Controller('parser')
export class ParserController {
  constructor(private readonly parserService: ParserService) {}

  @Post()
  create(@Body() createParserDto: CreateParserDto) {
    return this.parserService.create(createParserDto);
  }

  @Get()
  findAll() {
    return this.parserService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.parserService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateParserDto: UpdateParserDto) {
    return this.parserService.update(+id, updateParserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.parserService.remove(+id);
  }
}
