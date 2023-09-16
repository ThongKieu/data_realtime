import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
function MapWorker({auth}) {
  return (
    <AuthenticatedLayout children={auth.user} user={auth.user}>
    <Head title="Trang Chủ" />

    </AuthenticatedLayout>
  )
}

export default MapWorker
