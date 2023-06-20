import { createClient } from 'contentful'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import Image from 'next/image'

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_KEY,
})

export const getStaticPaths = async () => {
  const res = await client.getEntries({ 
    content_type: "projects" 
  })

  const paths = res.items.map(item => {
    return {
      params: { slug: item.fields.slug }
    }
  })

  return {
    paths,
    fallback: false
  }
}

export const getStaticProps = async ({ params }) => {
  const { items } = await client.getEntries({
    content_type: 'projects',
    'fields.slug': params.slug
  })

  return {
    props: { projects: items[0] }
  }

}

export default function ProjectDetails({projects}) {
  const { thumbnail, title, backgroundImage, productImage, excerpt, brief, deliverables, imageSlider, approach, approachImage, footerImg } = projects.fields

  return (
    <div>
      <div className="banner">
        <Image 
          src={'https:' + productImage.fields.file.url}
          width={productImage.fields.file.details.image.width}
          height={productImage.fields.file.details.image.height}
        />
        <h2>{ title }</h2>
      </div>

      <div className="info">
        <p>
          {brief}
        </p>

        {deliverables.map(ing => (
          <span key={ing}>{ ing }</span>
        ))}
      </div>
      
      {/* <--- rich text editor ---> */}
      {/* <div className="method">
        <h3>Method:</h3>
        <div>{documentToReactComponents(method)}</div>
      </div> */}

    </div>
  )
}