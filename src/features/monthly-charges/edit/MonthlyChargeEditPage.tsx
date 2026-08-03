"use client";

import { ErrorComponent } from "@/components/common/error";

import { getErrorMessage } from "@/utils/get-error-message";

import { MonthlyChargeInformationCard } from "../shared/MonthlyChargeInformationCard";

import { MonthlyChargeForm } from "../shared/MonthlyChargeForm";

import { MonthlyChargeDangerZone } from "./components/MonthlyChargeDangerZone";
import { MonthlyChargeEditHeader } from "./components/MonthlyChargeEditHeader";
import { MonthlyChargeEditSkeleton } from "./components/MonthlyChargeEditSkeleton";

import { useMonthlyChargeEdit } from "./useMonthlyChargeEdit";

interface Props {
  id: string;
}

export function MonthlyChargeEditPage({
  id,
}: Props) {
  const {
    monthlyCharge,
    monthlyChargeQuery,

    form,

    handleSubmit,
    handleDelete,

    isSubmitting,
    isDeleting,
  } = useMonthlyChargeEdit({
    id,
  });

  if (monthlyChargeQuery.isLoading) {
    return <MonthlyChargeEditSkeleton />;
  }

  if (monthlyChargeQuery.isError) {
    return (
      <ErrorComponent
        title="Failed to load monthly charge."
        error={getErrorMessage(monthlyChargeQuery.error)}
        onRetry={monthlyChargeQuery.refetch}
      />
    );
  }

  if (!monthlyCharge) {
    return null;
  }

  return (
    <div className="space-y-6 p-6">
      <MonthlyChargeEditHeader
        id={monthlyCharge.id}
        familyNo={monthlyCharge.familyNo}
        month={monthlyCharge.month}
        year={monthlyCharge.year}
      />

      <div className="grid gap-6 xl:grid-cols-12">
        <div className="xl:col-span-8">
          <MonthlyChargeForm
            title="Edit Monthly Charge"
            submitText="Save Changes"
            form={form}
            monthlyCharge={monthlyCharge}
            isSubmitting={isSubmitting}
            showMetadata
            createdAt={monthlyCharge.createdAt}
            updatedAt={monthlyCharge.updatedAt}
            onSubmit={handleSubmit}
            onCancel={() => form.reset()}
          />
        </div>

        <div className="space-y-6 xl:col-span-4">
          <MonthlyChargeInformationCard
            monthlyCharge={{
              ...monthlyCharge,
              ...form.watch(),
            }}
          />

          <MonthlyChargeDangerZone
            isDeleting={isDeleting}
            onDelete={handleDelete}
          />
        </div>
      </div>
    </div>
  );
}