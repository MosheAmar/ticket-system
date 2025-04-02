'use server'

import { auth } from '@/lib/auth';
import User from './models'
import { headers } from 'next/headers';
import { mp } from '@/lib/mixpanel';

export async function initTickets () {
    const session = await auth.api.getSession({
        headers: await headers()
    })
    const email = session.user.email
    const newUser = new User({
        email,
      });
    newUser.save()
}

export async function addTicket (title, description) {
    const session = await auth.api.getSession({
            headers: await headers()
    })
    if (session) {
        const currentDate = new Date();
        const hours = String(currentDate.getHours()).padStart(2, '0');
        const minutes = String(currentDate.getMinutes()).padStart(2, '0');
        const seconds = String(currentDate.getSeconds()).padStart(2, '0');
        const formattedDate = currentDate.toISOString().split('T')[0];
        const date = `${formattedDate}   ${hours}:${minutes}:${seconds}`;
        const email = session.user.email
        const newTicket = {
            title, 
            description, 
            date,
        }
        await User.findOneAndUpdate({email: email}, { '$push': { tickets: newTicket }}, {new: true})
        mp.track("ticket_add", {distinct_id: session.user.id})
    }
}

export async function getTickets() {
    const session = await auth.api.getSession({
        headers: await headers()
    })
    const email = session.user.email
    const user = await User.findOne({email: email})
    const tickets = JSON.stringify(user.tickets)
    return tickets
}