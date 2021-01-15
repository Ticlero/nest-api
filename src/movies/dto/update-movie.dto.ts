import { PartialType } from '@nestjs/mapped-types';
import { IsNumber, IsString } from 'class-validator';
import { CreateMovieDto } from './create-movie.dto';

//PartialType는 CreateMovieDto의 properties가 부분적으로 필요하다는 것을 알림
export class UpdateMovieDto extends PartialType(CreateMovieDto) {
  //   @IsString()
  //   readonly title?: string;
  //   @IsNumber()
  //   readonly year?: number;
  //   @IsString({ each: true })
  //   readonly genres?: string[];
}
