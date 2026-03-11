import 'devicon/devicon.min.css'

export default function Skills() {
  return (
    <section id="about" className="page w-full flex flex-col gap-6 lg:gap-16  py-4 lg:py-16 pt-0">
      <p className="text-5xl ">Tools and technologies I work with on a daily basis.</p>
      <div className="flex flex-wrap lg:justify-start justify-center  gap-6">
        <i className="devicon-react-original text-7xl"></i>
        <i className="devicon-nextjs-original-wordmark text-7xl"></i>

        <i className="devicon-reactnative-original-wordmark text-7xl"></i>

        <i className="devicon-expo-original-wordmark text-7xl"></i>
        <i className="devicon-tailwindcss-original text-7xl"></i>

        <i className="devicon-nodejs-plain-wordmark text-7xl"></i>
        <i className="devicon-express-original text-7xl"></i>
        <i className="devicon-postgresql-plain text-7xl"></i>
        <i className="devicon-mongodb-plain text-7xl"></i>
        <i className="devicon-docker-plain text-7xl"></i>
      </div>
      <p className="text-sm">
        These are the technologies I work with on a daily basis. I use them to build modern,
        responsive web and mobile applications, create reliable backends, and deploy scalable
        solutions.
      </p>
    </section>
  )
}
