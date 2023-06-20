import { createClient } from 'contentful'
import ProjectCard from 'components/projectCard'

export async function getStaticProps() {

  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_KEY,
  })

  const res = await client.getEntries({ content_type: "projects" })
  return {
    props: {
      project: res.items,
    }
  }
}

export default function Projects({ project }) {
    console.log(project)
  return (
    <div className="project-list">
      {project.map(projects => (
        <ProjectCard key={projects.sys.id} project={projects} />
      ))}
    </div>
  )
}