import { ApiProperty } from "@nestjs/swagger";

export class CreateTutorDto {
    @ApiProperty()
    email: string;

    @ApiProperty()
    password: string;
}