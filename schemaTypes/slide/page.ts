// ./schemas/heroSlider.js

export default {
  name: 'heroSlider',
  title: 'Hero Slider',
  type: 'document',
  fields: [
     {
      name: "order",
      title: "Slide Order",
      type: "number",
      description: "Controls the order in which slides appear (lower = shown first)",
      initialValue: 0,
      validation: (Rule) => Rule.min(0).warning("Order should be 0 or higher."),
    },
   
    {
      name: 'title',
      title: 'Slide Title',
      type: 'string',
      validation: (Rule) => Rule.required().error('Title is required'),
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required().error('Description is required'),
    },
    {
      name: 'image',
      title: 'Background Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required().error('Slide image is required'),
    },
    {
      name: 'buttons',
      title: 'Buttons',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'button',
          fields: [
            {
              name: 'label',
              title: 'Label',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'link',
              title: 'Link',
              type: 'url',
              validation: (Rule) => Rule.uri({
                allowRelative: true,
                scheme: ['http', 'https'],
              }),
            },
            {
              name: 'type',
              title: 'Type',
              type: 'string',
              options: {
                list: [
                  { title: 'Primary', value: 'primary' },
                  { title: 'Secondary', value: 'secondary' },
                ],
                layout: 'radio',
              },
              initialValue: 'primary',
            },
            {
              name: 'icon',
              title: 'Button Icon (optional)',
              type: 'image',
              options: {
                hotspot: true,
              },
            },
          ],
          preview: {
            select: {
              title: 'label',
              subtitle: 'type',
            },
          },
        },
      ],
    },
  
  ],
   preview: {
    select: {
      title: "title",
      subtitle: "description",
      media: "image",
      order: "order",
    },
    prepare({ title, subtitle, media, order }) {
      return {
        title: `${order !== undefined ? order + ". " : ""}${title}`,
        subtitle: subtitle?.slice(0, 80) + (subtitle?.length > 80 ? "..." : ""),
        media,
      };
    },
  },
};