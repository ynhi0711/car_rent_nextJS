import { OnQueueCompleted, Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';

import {
    EMAIL_QUEUE,
    PLACE_ORDER_EMAIL,
    REGISTER_ACCOUNT_EMAIL,
} from '../common/constant';
import { MyService } from 'src/config.service';

@Processor(EMAIL_QUEUE)
export class QueueConsumer {
    private readonly sgMail = require('@sendgrid/mail');
    constructor(
        private myService: MyService
    ) {
        this.sgMail.setApiKey(myService.getSendgridApiKey());
    }

    @Process(REGISTER_ACCOUNT_EMAIL)
    processRegisterAccountJob(job: Job<unknown>) {
        const email = job.data['email'];
        const name = job.data['name'];
        // const phone = job.data['phone'];

        const msg = {
            to: email,
            from: this.myService.getSendgridSupportEmail(),
            templateId: this.myService.getSendgridRegisterTemplateId(),
            dynamicTemplateData: {
                user_name: name,
                user_email: email,
                // phone: phone,
                support_mail: this.myService.getSendgridSupportEmail(),
            },
        };
        this.sgMail
            .send(msg)
            .then(() => {
                console.log('Email sent successfully!');
            })
            .catch((error) => {
                console.error(error);
            });
    }

    @Process(PLACE_ORDER_EMAIL)
    processPlaceOrderJob(job: Job<unknown>) {
        const email = job.data['email'];
        const name = job.data['name'];
        const car_model = job.data['car_model'];
        const pick_up_date = job.data['pick_up_date'];
        const drop_off_date = job.data['drop_off_date'];
        const total_cost = job.data['total_cost'];
        const payment_method = job.data['payment_method'];

        const msg = {
            to: email,
            from: this.myService.getSendgridSupportEmail(),
            templateId: this.myService.getSendgridPlaceOrderTemplateId(),
            dynamicTemplateData: {
                user_name: name,
                car_model: car_model,
                pick_up_date: pick_up_date,
                drop_off_date: drop_off_date,
                total_cost: total_cost,
                payment_method: payment_method,
                support_mail: this.myService.getSendgridSupportEmail(),
            },
        };
        console.log('content: ' + JSON.stringify(msg));
        this.sgMail
            .send(msg)
            .then(() => {
                console.log('Email sent successfully!');
            })
            .catch((error) => {
                console.error(error);
            });
    }

    @OnQueueCompleted()
    onCompleted(job: Job) {
        console.log(
            `Completed job ${job.id} of type ${job.name} with data ${job.data}...`,
        );
    }

    
}