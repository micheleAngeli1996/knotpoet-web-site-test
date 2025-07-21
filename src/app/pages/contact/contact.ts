import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SeoService } from '../../services/seo.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-contact',
  imports: [RouterModule, ReactiveFormsModule],
  template: `
    <div class="container mx-auto px-4 py-20">
      <div class="max-w-2xl mx-auto">
        <h1>Contact</h1>

        <div class="bg-white/5 backdrop-blur-sm rounded-lg p-8">
          <form class="space-y-6" [formGroup]="contactForm">
            <div class="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" class="block text-white/70 text-sm mb-2">
                  Name*
                </label>
                <div class="w-full max-w-sm min-w-[200px]">
                  <input id="name" placeholder="Your name" formControlName="name" required
                  class="w-full  text-white bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease 
                  user-invalid:border-red-500 focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" />
                </div>
              </div>
              <div>
                <label htmlFor="email" class="block text-white/70 text-sm mb-2">
                  Email*
                </label>
                <input
                  formControlName="email"
                  id="email"
                  type="email"
                  class="w-full text-white bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease 
                  invalid:border-red-500 focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" 
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="subject" class="block text-white/70 text-sm mb-2">
                Subject
              </label>
              <input
              formControlName="subject"
                id="subject"
                type="text"
                class="w-full text-white bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                placeholder="Message subject"
              />
            </div>

            <div>
              <label htmlFor="message" class="block text-white/70 text-sm mb-2">
                Message*
              </label>
              <textarea
                formControlName="message"
                id="message"
                rows={6}
                class="w-full text-white bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                placeholder="Your message..."
              ></textarea>
            </div>
            <button class="w-full cursor-pointer" type="button" (click)="onSubmit()">
              Send Message
          </button>
          </form>
        </div>

        <div class="mt-12 text-center space-y-4 text-white/70">
          <p>For booking inquiries and collaborations:</p>
          <p class="text-white/90">info&commat;knotpoet.com</p>
        </div>
      </div>
    </div>
  `,
  styleUrl: './contact.css'
})
export class Contact implements OnInit {
  contactForm: FormGroup;

  private fb: FormBuilder = inject(FormBuilder);
  private seoService = inject(SeoService);
  private http = inject(HttpClient);
  private messageService = inject(MessageService);

  constructor(
  ) {
    this.contactForm = this.fb.group({
      name: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      subject: ["", Validators.required],
      message: ["", Validators.required],
    })
  }

  ngOnInit(): void {
    this.messageService.show({ type: 'info', text: 'Your message has been sent' });
    
    this.seoService.updateSeoData({
      title: "Contact Knot Poet - Get in Touch",
      description:
        "Contact Knot Poet for booking inquiries, collaborations, or general questions. Connect with us through our cosmic journey in dreaming metal.",
      keywords: "contact knot poet, booking inquiries, collaboration, dreaming metal contact, band contact",
      image: "/placeholder.svg?height=630&width=1200",
      url: "https://knotpoet.com/contact",
      type: "website",
      author: "Knot Poet",
    })

    // Add structured data for contact page
    this.seoService.addStructuredData({
      "@context": "https://schema.org",
      "@type": "ContactPage",
      name: "Contact Knot Poet",
      description: "Get in touch with Knot Poet for booking inquiries, collaborations, or general questions.",
      mainEntity: {
        "@type": "Organization",
        name: "Knot Poet",
        email: "info@knotpoet.com",
        url: "https://knotpoet.com",
        sameAs: [
          "https://instagram.com/knotpoet_",
          "https://facebook.com/knotpoet",
          "https://spotify.com/artist/knotpoet",
          "https://youtube.com/knotpoet",
        ],
      },
    })
  }

  onSubmit() {
    if (this.contactForm.valid) {
      const emailToReplay = this.contactForm!.get('emailToReplay')!.value;
      const name = this.contactForm!.get('name')!.value;
      const message = this.contactForm!.get('message')!.value;
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      this.http.post('https://formspree.io/f/xqabydzl',
        { name, replyto: emailToReplay, message }, { 'headers': headers }).subscribe(
          {
            next: response => {
              console.log(response);
              this.contactForm.reset();
            },
            error: error => {
              this.messageService.show({ type: 'error', text: 'An error occurred while sending the message' });
            },
            complete: () => {
              this.messageService.show({ type: 'success', text: 'Your message has been sent' });
            }
          }
        );
    } else {
      this.messageService.show({ type: 'error', text: 'Please fill all the fields' });
    }
  }
}
