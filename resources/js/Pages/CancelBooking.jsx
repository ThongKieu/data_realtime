import React from 'react'
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from '@inertiajs/react';
function CancelBooking({auth}) {
  return (
    <AuthenticatedLayout children={auth.user} user={auth.user}>
    <Head title="Trang Chủ" />

    </AuthenticatedLayout>
  )
}

export default CancelBooking
