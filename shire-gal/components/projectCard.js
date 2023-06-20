import Link from 'next/link'
import Image from 'next/image'

export default function ProjectCard({ project }) {
  const { title, slug, excerpt, thumbnail } = project.fields

  return (
    <div className="card">
      <div className="featured">
        {/* featured image */}
        <Image 
          src={'https:' + thumbnail.fields.file.url}
          width={thumbnail.fields.file.details.image.width}
          height={thumbnail.fields.file.details.image.height}
        />
      </div>
      <div className="content">
        <div className="info">
          <h4>{ title }</h4>
          <p>{ excerpt }</p>
        </div>
        <div className="actions">
            <Link href={'/projects/' + slug}>
                Cook this
            </Link>
        </div>
      </div>
    </div>
  )
}