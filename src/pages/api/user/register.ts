import type { NextApiRequest, NextApiResponse } from 'next'
import { signUp } from '@/lib/firebase/service'
import { fetchProducts } from '@/lib/firebase/service'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
// res.status(200).json({
//     status: true, message: "Yeay sukses"
// })
    if (req.method === 'GET') {
        try {
            const data = await fetchProducts(); // Mengambil data tanpa parameter callback
            res.status(200).json({ status: true, statuslCode: 200, message: 'success', note: 'yeay bisa dong', data}); // Menambahkan tanda kurung tutup yang kurang
        } catch (error) {
            res.status(500).json({ status: false, statusCode: 500, message: 'error', note: 'gagal mengambil data' }); // Menangani error jika getData gagal
        }
    }
    
    console.log('isi req',req)
    if (req.method === 'POST') {
        await signUp(req.body, (status: boolean) => {
            if (status) {
                res.status(200).json({ status: true, statusCode: 200, message: 'success', note: 'yeay bisa dong' })
            } else {
                res.status(400).json({ status: false, statusCode: 400, message: 'failed', note: 'yahh gagal' })
            }
        })
    } else {
        res.status(405).json({
            status: false, statusCode: 405, message: 'method not allowed', note: 'lu nyasar jir'
        })
    }
}