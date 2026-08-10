"use client"

// src/features/user/shared/UserForm.tsx
import { Controller, type Path, type UseFormReturn } from "react-hook-form"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { UnsavedChangesBar } from "@/components/common/unsaved-changes-bar"

import type { CreateUserFormValues } from "@/schemas/user/create-user.schema"
import type { UpdateUserFormValues } from "@/schemas/user/update-user.schema"

import { USER_ROLES, USER_STATUSES } from "@/constants/user"

// Shared union of both schema types
type UserFormValues = CreateUserFormValues | UpdateUserFormValues

interface UserFormProps<T extends UserFormValues> {
  mode: "create" | "edit"

  form: UseFormReturn<T>

  isSubmitting: boolean
  onSubmit: (values: T) => Promise<void>
  onReset: () => void

  children?: React.ReactNode
}

// Generic function - allows this component to be type-safe for both Create and Edit forms
export function UserForm<T extends UserFormValues>({
  mode,
  form,
  isSubmitting,
  onSubmit,
  onReset,
  children,
}: UserFormProps<T>) {
  const {
    control,
    formState: { isDirty, isValid },
  } = form

  const selectFormate = (value: string) => {
    return value
      .toLocaleLowerCase()
      .replace(/_/g, " ")
      .replace(/(^\w|\s\w)/g, (m) => m.toUpperCase())
  }

  return (
    <form
      id="user-form"
      className="space-y-6"
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
          <CardDescription>
            Enter the user&apos;s personal information.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <FieldGroup className="grid gap-5 md:grid-cols-2">
            {/* Name */}
            <Controller
              name={"name" as Path<T>}
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Full Name</FieldLabel>

                  <Input
                    {...field}
                    value={(field.value as string) ?? ""}
                    placeholder="Abdur Rahman"
                    autoComplete="name"
                    aria-invalid={fieldState.invalid}
                  />

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* Phone */}
            <Controller
              name={"phone" as Path<T>}
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Phone Number</FieldLabel>

                  <Input
                    {...field}
                    value={(field.value as string) ?? ""}
                    placeholder="+8801712345678"
                    autoComplete="tel"
                    aria-invalid={fieldState.invalid}
                  />

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* Email */}
            <Controller
              name={"email" as Path<T>}
              control={control}
              render={({ field, fieldState }) => (
                <Field
                  className="md:col-span-2"
                  data-invalid={fieldState.invalid}
                >
                  <FieldLabel>Email Address</FieldLabel>

                  <Input
                    {...field}
                    value={(field.value as string) ?? ""}
                    type="email"
                    placeholder="admin@mosque.com"
                    autoComplete="email"
                    aria-invalid={fieldState.invalid}
                  />

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Account Settings</CardTitle>
          <CardDescription>
            {mode === "create"
              ? "Set login credentials and access permissions."
              : "Update login credentials and access permissions."}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <FieldGroup className="grid gap-5 md:grid-cols-2">
            {/* Password */}
            <Controller
              name={"password" as Path<T>}
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>
                    Password
                    {mode === "edit" && (
                      <span className="ml-1 font-normal text-muted-foreground">
                        (leave blank to keep current)
                      </span>
                    )}
                  </FieldLabel>

                  <Input
                    {...field}
                    value={(field.value as string) ?? ""}
                    type="password"
                    placeholder={
                      mode === "create"
                        ? "Enter a strong password"
                        : "Enter a new password"
                    }
                    autoComplete="new-password"
                    aria-invalid={fieldState.invalid}
                  />

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* Repeat Password */}
            <Controller
              name={"repeatPassword" as Path<T>}
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Repeat Password</FieldLabel>

                  <Input
                    {...field}
                    value={(field.value as string) ?? ""}
                    type="password"
                    placeholder="Confirm your password"
                    autoComplete="new-password"
                    aria-invalid={fieldState.invalid}
                  />

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* Role */}
            <Controller
              name={"role" as Path<T>}
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Role</FieldLabel>

                  <Select
                    key={(field.value as string) || "role-empty"}
                    value={field.value as string}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger aria-invalid={fieldState.invalid}>
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>

                    <SelectContent className="p-1">
                      {USER_ROLES.map((role) => (
                        <SelectItem key={role} value={role}>
                          {selectFormate(role)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* Status - Edit mode only */}
            {mode === "edit" && (
              <Controller
                name={"status" as Path<T>}
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Account Status</FieldLabel>

                    <Select
                      key={(field.value as string) || "status-empty"}
                      value={field.value as string}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger aria-invalid={fieldState.invalid}>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>

                      <SelectContent className="p-1">
                        {USER_STATUSES.map((status) => (
                          <SelectItem key={status} value={status}>
                            {selectFormate(status)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            )}
          </FieldGroup>

          {children}
        </CardContent>
      </Card>

      <UnsavedChangesBar
        isDirty={isDirty}
        isValid={isValid}
        isSubmitting={isSubmitting}
        onReset={onReset}
        onSubmit={form.handleSubmit(onSubmit)}
        position="top"
      />
    </form>
  )
}
