'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Label } from '@radix-ui/react-label';

interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {}

const Form = React.forwardRef<HTMLFormElement, FormProps>(
  ({ className, ...props }, ref) => {
    return (
      <form
        ref={ref}
        className={cn('space-y-6', className)}
        {...props}
      />
    );
  }
);
Form.displayName = 'Form';

interface FormFieldProps {
  children: React.ReactNode;
  className?: string;
}

const FormField = React.forwardRef<HTMLDivElement, FormFieldProps>(
  ({ children, className }, ref) => {
    return (
      <div ref={ref} className={cn('space-y-2', className)}>
        {children}
      </div>
    );
  }
);
FormField.displayName = 'FormField';

interface FormLabelProps extends React.ComponentPropsWithoutRef<typeof Label> {}

const FormLabel = React.forwardRef<
  React.ElementRef<typeof Label>,
  FormLabelProps
>(({ className, ...props }, ref) => {
  return (
    <Label
      ref={ref}
      className={cn('text-sm font-medium', className)}
      {...props}
    />
  );
});
FormLabel.displayName = 'FormLabel';

interface FormMessageProps extends React.HTMLAttributes<HTMLParagraphElement> {}

const FormMessage = React.forwardRef<HTMLParagraphElement, FormMessageProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <p
        ref={ref}
        className={cn('text-sm font-medium text-destructive', className)}
        {...props}
      >
        {children}
      </p>
    );
  }
);
FormMessage.displayName = 'FormMessage';

export { Form, FormField, FormLabel, FormMessage };

