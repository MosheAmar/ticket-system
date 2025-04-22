'use server'

import { auth, db } from '@/lib/auth';
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

export async function initTicketsManually (email) {
    const newUser = new User({
        email,
      });
    newUser.save()
}

const { ObjectId } = require("mongodb")

export async function removeUser (id) {
    const user = await db.collection('user').findOne({_id: new ObjectId(id)})
    const email = user.email
    await User.deleteOne({email})
    return
}

export async function addTicket (title, description) {
    const session = await auth.api.getSession({
            headers: await headers()
    })
    if (session) {
        const email = session.user.email
        const user = await User.findOne({email})
        try {
            user.tickets.push({title, description})
            await user.save()
            mp.track("ticket_add", {distinct_id: session.user.id})
        } catch (err) {
            console.log(err)
        }
    }
}
export async function deleteTicket (id) {
    const session = await auth.api.getSession({
            headers: await headers()
    })
    if (session) {
        const email = session.user.email
        const user = await User.findOne({email})
        try {
            user.tickets.pull({_id: id})
            await user.save()
            mp.track("ticket_delete", {distinct_id: session.user.id})
        } catch (err) {
            console.log(err)
        }
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