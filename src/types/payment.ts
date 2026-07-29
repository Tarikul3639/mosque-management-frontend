export interface FamilyLedgerQuery {
    familyId: string
    year?: number
    month?: number
}

export interface FamilyLedgerResponse {
    familyId: string;
    familyNo: string;
    headName: string;
    phone: string;
    address: string;

    summary: {
        totalCharge: number;
        totalPaid: number;
        totalDue: number;
    };

    ledger: FamilyLedgerItem[];
}

export interface FamilyLedgerItem {
    monthlyChargeId: string;

    year: number;
    month: number;

    chargeAmount: number;
    paidAmount: number;
    dueAmount: number;

    status: "PAID" | "PARTIAL" | "DUE";

    payments: FamilyLedgerPayment[];
}

export interface FamilyLedgerPayment {
    id: string;
    amount: number;
    method: string;
    reference: string | null;
    note: string | null;
    paidAt: string;
}