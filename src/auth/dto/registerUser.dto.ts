import {Field, InputType} from 'type-graphql';
import {IsNotEmpty} from 'class-validator';
import {ApiModelProperty} from '@nestjs/swagger';

@InputType()
export class RegisterUserDto {
    @IsNotEmpty()
    @ApiModelProperty()
    @Field() email: string;

    @IsNotEmpty()
    @ApiModelProperty()
    @Field() password: string;
}
