// -- CONSTANTS -- //

export interface ServiceItemType {
    id: number
    title: string
    category: string
    description: string
    href: string
    folder: string
    images: string[]
}

export interface CategoryDetails {
    description: string
    services: ServiceItemType[]
}

export const categoryDescriptions: Record<string, string> = {
    Apparel:
        'Clothing items including custom-printed shirts and elegant sashes.',
    Signage:
        'Various signage options like durable stickers and lightweight styrofoam signs.',
    Business:
        'Business-related products such as illuminated signage and tarpaulin banners.',
    Others: 'Miscellaneous items including hand-painted or printed murals.',
}

export const services_data: ServiceItemType[] = [
    {
        id: 0,
        title: 'T-shirts',
        category: 'Apparel',
        description: 'Custom-printed shirts for businesses, teams, and events.',
        href: '/#',
        folder: 'tshirts',
        images: [
            'bpso_1.jpg',
            'bpso_2.jpg',
            'bpso_3.jpg',
            'bpso_4.jpg',
            'bulilit_1.jpg',
            'bulilit_2.jpg',
            'bulilit_3.jpg',
            'bulilit_4.jpg',
            'chum_1.jpg',
            'cnhs_1.jpg',
            'cnhs_2.jpg',
            'cnhs_3.jpg',
            'cnhs_4.jpg',
            'cnsc_1.jpg',
            'dnnr_1.jpg',
            'dtf_1.jpg',
            'dtf_2.jpg',
            'dtf_3.jpg',
            'dtf_4.jpg',
            'dtf_5.jpg',
            'dtf_6.jpg',
            'dtf_7.jpg',
            'dtf_8.jpg',
            'egg_1.jpg',
            'fac_1.jpg',
            'fac_2.jpg',
            'family_1.jpg',
            'family_2.jpg',
            'family_3.jpg',
            'fili_1.jpg',
            'fili_2.jpg',
            'hardstring_1.jpg',
            'hardstring_2.jpg',
            'ibp_1.jpg',
            'ibp_2.jpg',
            'ibp_3.jpg',
            'jdp_1.jpg',
            'jdp_2.jpg',
            'jdp_3.jpg',
            'jdp_4.jpg',
            'resthouse_1.jpg',
            'sabungero_1.jpg',
            'tris_1.jpg',
            'tris_2.jpg',
            'tris_3.jpg',
            'tris_4.jpg',
        ],
    },
    {
        id: 1,
        title: 'Sash',
        category: 'Apparel',
        description:
            'Elegant, custom-made sashes perfect for pageants, graduations, and ceremonies.',
        href: '/#',
        folder: 'sablay',
        images: [
            'sablay_1.jpg',
            'sablay_2.jpg',
            'sablay_3.jpg',
            'sablay_4.jpg',
            'sash_1.jpg',
            'sash_10.jpg',
            'sash_11.jpg',
            'sash_12.jpg',
            'sash_2.jpg',
            'sash_3.jpg',
            'sash_4.jpg',
            'sash_5.jpg',
            'sash_6.jpg',
            'sash_7.jpg',
            'sash_8.jpg',
            'sash_9.jpg',
        ],
    },
    {
        id: 2,
        title: 'Stickers',
        category: 'Signage',
        description:
            'Durable and vibrant stickers for branding, promotions, and personal use.',
        href: '/#',
        folder: 'stickers',
        images: [
            'menu_1.jpg',
            'sticker_1.jpg',
            'sticker_10.jpg',
            'sticker_11.jpg',
            'sticker_2.jpg',
            'sticker_3.jpg',
            'sticker_4.jpg',
            'sticker_5.jpg',
            'sticker_6.jpg',
            'sticker_7.jpg',
            'sticker_8.jpg',
            'sticker_9.jpg',
        ],
    },
    {
        id: 3,
        title: 'Panaflex',
        category: 'Business',
        description:
            'High-quality illuminated signage for businesses, events, and advertisements.',
        href: '/#',
        folder: 'panaflex',
        images: [
            'chicken_1.jpg',
            'chicken_2.jpg',
            'divisoria_1.jpg',
            'divisoria_2.jpg',
            'kofee_1.jpg',
            'obal_1.jpg',
            'obal_2.jpg',
            'obal_3.jpg',
            'pizza_1.jpg',
            'pizza_2.jpg',
            'seven_eleven_1.jpg',
        ],
    },
    {
        id: 4,
        title: 'Taurpaulin',
        category: 'Business',
        folder: 'taurpaulin',
        description:
            'Weather-resistant tarpaulin banners for advertising and event backdrops.',
        href: '/#',
        images: [
            'eagles_1.jpg',
            'rojas_1.jpg',
            'tarp_1.jpg',
            'tarp_2.jpg',
            'tarp_3.jpg',
            'tarp_4.jpg',
            'tarp_5.jpg',
            'tarp_6.jpg',
            'tarp_7.jpg',
            'tarp_8.jpg',
        ],
    },

    {
        id: 5,
        title: 'Styro Signs',
        category: 'Signage',
        description:
            'Lightweight and customizable styrofoam signage for decorations and branding.',
        href: '/#',
        folder: 'decors',
        images: [
            'decor_1.jpg',
            'decor_10.jpg',
            'decor_11.jpg',
            'decor_12.jpg',
            'decor_13.jpg',
            'decor_14.jpg',
            'decor_15.jpg',
            'decor_16.jpg',
            'decor_2.jpg',
            'decor_3.jpg',
            'decor_4.jpg',
            'decor_5.jpg',
            'decor_6.jpg',
            'decor_7.jpg',
            'decor_8.jpg',
            'decor_9.jpg',
        ],
    },

    {
        id: 6,
        title: 'Mural',
        folder: 'paint',
        category: 'Others',
        description:
            'Hand-painted or printed murals to bring life to walls and creative spaces.',
        href: '/#',
        images: ['paint_1.jpg', 'paint_2.jpg'],
    },
]

export const groupedItems = services_data.reduce<
    Record<string, typeof services_data>
>((acc, item) => {
    if (!acc[item.category]) {
        acc[item.category] = []
    }
    acc[item.category].push(item)
    return acc
}, {})
