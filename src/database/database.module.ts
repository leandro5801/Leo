import { Module } from '@nestjs/common';
import DataProvider from './data.provider';

@Module({
    imports:[DataProvider],
    exports:[DataProvider]
})
export class DatabaseModule {}
