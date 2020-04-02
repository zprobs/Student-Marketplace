from django.core.mail import EmailMultiAlternatives


class EmailGenerator():
    def activation_email(self, recipient, link):
        subject = "Student Marketplace Account Activation"
        content = "Please do not reply to this email. Click the activation link to activate your account: " + link
        sender = "activation@sandboxf972cffb99eb4acb8cf8b9dd9435e91a.mailgun.org"
        msg = EmailMultiAlternatives(subject, content, sender, [recipient])

        return msg


email_generator = EmailGenerator()