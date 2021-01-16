import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  Req,
  Res,
} from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entities/movie.entity';
import { MoviesService } from './movies.service';
/**
 * nestjs는 Single-responsibility principle을 따름
 * module, class, function이 하나의 기능은 꼭 책임지는 원칙
 */
//@Controller([url entry point]) basic router
@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  getAll(): Movie[] {
    //return 'This will return all movies';
    return this.moviesService.getAll();
  }

  //요청된 url의 parameter를 가져오는 방법
  @Get('/:id')
  getOne(@Param('id') movieId: number): Movie {
    //return `This will return one movie with the movieId ${movieId}`;
    return this.moviesService.getOne(movieId);
  }

  //Post의 request body 가져오는 방법은 @Body 데코레이터 이용
  @Post()
  create(@Body() movieData: CreateMovieDto) {
    //return movieData;
    return this.moviesService.create(movieData);
  }

  @Delete(`/:id`)
  remove(@Param('id') movieId: number) {
    //return `This will delete a movie with the id: ${movieId}`;
    return this.moviesService.deleteOne(movieId);
  }

  //Patch는 content의 일부분만 업데이트할 때 사용
  @Patch('/:id')
  patch(@Param('id') movieId: number, @Body() updateData: UpdateMovieDto) {
    //return `PATCH This will update a movie with the id ${movieId}`;
    // return {
    //   updateMovie: movieId,
    //   ...updateData,
    // };
    return this.moviesService.update(movieId, updateData);
  }

  //Put은 content의 전체를 업데이트할 때 사용
  // @Put('/:id')
  // put(@Param('id') movieId: number) {
  //   return `PUT This will update a movie with the id ${movieId}`;
  // }
}
