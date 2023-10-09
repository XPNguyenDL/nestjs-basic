import { Controller, Get } from '@nestjs/common';

@Controller('')
export class HomepageController {

    @Get()
    getHomepage() {
        return {
            "title": "Tutor connect"
        };
    }
}
