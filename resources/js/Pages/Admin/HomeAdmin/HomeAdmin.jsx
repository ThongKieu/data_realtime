import AuthenticatedLayout from '@/Layouts/Admin/AuthenticatedLayoutAdmin';
import Home from '@/Pages/Admin/HomeAdmin/Components/Home';
import { Head } from '@inertiajs/react';
import React from 'react'

export default function HomeAdmin({ auth }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
        >
            <Head title="Home Admin" />
            <Home />
        </AuthenticatedLayout>
    );
}
