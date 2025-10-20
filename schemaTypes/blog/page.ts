// /schemas/blog.ts (Legacy version)
export interface ValidationRule {
    required(): ValidationRule;
    min(length: number): ValidationRule;
}

const blogSchema = {
    name: 'blog',
    title: 'Blog',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: (Rule: ValidationRule) => Rule.required().min(10),
        },
        {
            name: 'thumbnail',
            title: 'Thumbnail',
            type: 'image',
            options: { hotspot: true },
            validation: (Rule: ValidationRule) => Rule.required(),
        },
        {
            name: 'photos',
            type: 'array',
            title: 'Photos',
            of: [
                {
                    type: 'image',
                    fields: [
                        {
                            name: 'alt',
                            type: 'string',
                            title: 'Alt text',
                            description: 'Important for SEO and accessibility',
                        },
                    ],
                    options: { hotspot: true },
                },
            ],
        },
        {
            name: 'body',
            title: 'Body',
            type: 'array',
            of: [
                {
                    type: 'block',
                },
                {
                    type: 'image',
                    fields: [
                        {
                            name: 'alt',
                            type: 'string',
                            title: 'Alt text',
                            description: 'Important for SEO and accessibility',
                        },
                    ],
                    options: { hotspot: true },
                },
            ],
            validation: (Rule: ValidationRule) => Rule.required().min(1),
        },
        {
            name: 'date',
            title: 'Date',
            type: 'date',
            options: { dateFormat: 'YYYY-MM-DD' },
            validation: (Rule: ValidationRule) => Rule.required(),
        },
        {
            name: 'author',
            title: 'Author',
            type: 'string',
            options: {
                list: [
                    { title: 'Matameni Kachusa', value: 'Matameni Kachusa' },
                    { title: 'Lendert Manani', value: 'Lendert Manani' },
                ],
            },
            validation: (Rule: ValidationRule) => Rule.required(),
        },
        // {
        //     name: 'slug',
        //     title: 'Slug',
        //     type: 'slug',
        //     options: {
        //         source: 'title',
        //         maxLength: 96,
        //     },
        //     validation: (Rule: ValidationRule) => Rule.required(),
        // },
        // {
        //     name: 'views',
        //     title: 'Views',
        //     type: 'number',
        //     initialValue: 0,
        //     readOnly: true,
        // },
    ],
}

export default blogSchema