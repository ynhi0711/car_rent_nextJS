import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MyService {
    constructor(private readonly configService: ConfigService) { }

    getDatabaseHost(): string {
        return this.configService.get<string>('DB_HOSTNAME');
    }
    getDatabaseUserName(): string {
        return this.configService.get<string>('DB_USERNAME');
    }
    getDatabasePassword(): string {
        return this.configService.get<string>('DB_PASSWORD');
    }
    getDatabaseName(): string {
        return this.configService.get<string>('DB_NAME');
    }
    getDatabasePort(): string {
        return this.configService.get<string>('DB_PORT');
    }
    getJwtAccessSecret(): string {
        return this.configService.get<string>('JWT_ACCESS_SECRET');
    }
    getJwtRefreshSecret(): string {
        return this.configService.get<string>('JWT_REFRESH_SECRET');
    }

}
