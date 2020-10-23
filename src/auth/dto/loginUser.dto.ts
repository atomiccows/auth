import { Field, InputType } from 'type-graphql';
import {ApiModelProperty} from '@nestjs/swagger';
import {IsNotEmpty} from 'class-validator';

@InputType()
export class LoginUserDto {

    @IsNotEmpty()
    @ApiModelProperty()
    @Field() email: string;

    @IsNotEmpty()
    @ApiModelProperty()
    @Field() password: string;
}
