import { ReceiptText } from "lucide-react"

import { EmptyState } from "@/components/common/empty-state"
import { Error2 } from "@/components/common/error2"
import { Pagination } from "@/components/common/pagination"

import { getExpenses } from "@/services/api/expenses.service"

import type { ExpenseCategory } from "@/types/expense"

import { ExpenseCard } from "./ExpenseCard"
import { ExpenseSectionHeader } from "./ExpenseSectionHeader"

interface ExpensesContentProps {
    page?: number
    limit?: number
    search?: string
    category?: ExpenseCategory
}

export async function ExpensesContent({
    page = 1,
    limit = 5,
    search,
    category,
}: ExpensesContentProps) {
    try {
        const expenses = await getExpenses({
            page,
            limit,
            search: search || undefined,
            category,
        })

        const hasExpenses = expenses.data.length > 0
        const hasFilter = Boolean(search || category)

        return (
            <section className="container mx-auto px-4 pb-16 md:px-6">
                <ExpenseSectionHeader total={expenses.meta.total} />

                {hasExpenses ? (
                    <>
                        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
                            {expenses.data.map((expense) => (
                                <ExpenseCard key={expense.id} expense={expense} />
                            ))}
                        </div>

                        <div className="mt-8">
                            <Pagination
                                currentPage={expenses.meta.page}
                                totalPages={expenses.meta.totalPages}
                                limit={limit}
                                showLimitSelector
                                limitOptions={[5, 9, 18, 36, 72]}
                            />
                        </div>
                    </>
                ) : (
                    <EmptyState
                        icon={<ReceiptText className="size-5" />}
                        title={
                            hasFilter ? "কোনো ব্যয় পাওয়া যায়নি" : "কোনো ব্যয়ের তথ্য নেই"
                        }
                        description={
                            hasFilter
                                ? "আপনার নির্বাচিত ফিল্টারের সাথে মিল থাকা কোনো ব্যয় পাওয়া যায়নি।"
                                : "বর্তমানে কোনো ব্যয়ের তথ্য যোগ করা হয়নি।"
                        }
                    />
                )}
            </section>
        )
    } catch {
        return (
            <section className="container mx-auto px-4 pb-16 md:px-6">
                <Error2
                    title="ব্যয়ের তথ্য লোড করা যায়নি"
                    message="কিছুক্ষণ পরে আবার চেষ্টা করুন।"
                />
            </section>
        )
    }
}
