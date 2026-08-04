"use client"

import { PaymentCreateHeader } from "./components/PaymentCreateHeader"
import { PaymentCreateForm } from "./components/PaymentCreateForm"

import { usePaymentCreate } from "./usePaymentCreate"

export function CreatePaymentPage() {
    const {
        form,

        families,
        monthlyCharges,

        loadingFamilies,
        loadingCharges,

        handleSearchFamily,
        handleSearchCharge,

        handleSubmit,

        isSubmitting,
    } = usePaymentCreate()

    return (
        <div className="space-y-6 p-6">
            <PaymentCreateHeader />
            {/* Create Payment Form */}
            <PaymentCreateForm
                form={form}
                families={families}
                monthlyCharges={monthlyCharges}
                loadingFamilies={loadingFamilies}
                loadingCharges={loadingCharges}
                isSubmitting={isSubmitting}
                onSearchFamily={handleSearchFamily}
                onSearchCharge={handleSearchCharge}
                onSubmit={handleSubmit}
            />
        </div>
    )
}
