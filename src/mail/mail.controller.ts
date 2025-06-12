import { Controller, Post, Body } from '@nestjs/common';
import { MailService } from './mail.service'; // ✅ Match class name

@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {} // ✅ Keep naming consistent

  @Post('send')
  async sendEmail(@Body() body: any) {
    const { to, subject, html, attachments } = body;

    return this.mailService.sendMailWithAttachments(
      to,
      subject,
      html,
      attachments || []
    );
  }
}
