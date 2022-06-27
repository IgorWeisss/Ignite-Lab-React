import { CheckCircle, Lock } from 'phosphor-react'
import { isPast, format } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import { Link, useParams } from 'react-router-dom';
import classNames from 'classnames'

interface LessonProps {
  title: string;
  slug: string;
  avaliableAt: Date;
  type: 'live' | 'class';
}

export function Lesson(props: LessonProps) {

  const { slug } = useParams<{slug: string}>()

  const isLessonAvailable = isPast(props.avaliableAt)
  const availableDateFormatted = format(props.avaliableAt, "EEEE' • 'd' de 'MMMM' • 'K'h'MM", {
    locale: ptBR
  })

  const isActiveLesson = slug === props.slug

	return (
		<Link
      to={`/event/lesson/${props.slug}`}
      className='group'
      onClick={!isLessonAvailable ? event => event.preventDefault() : undefined}
    >
      <span className="text-gray-300">
        {availableDateFormatted}
      </span>

      <div 
        className={classNames('relative rounded border border-gray-500 p-4 mt-2 group-hover:border-green-500', {
          'bg-green-500' : isActiveLesson,
        })}
      >
        <header className="flex items-center justify-between">

          {isLessonAvailable ? (
            <span className={classNames('text-sm font-medium flex items-center gap-2', {
              'text-white': isActiveLesson,
              'text-blue-500': !isActiveLesson
            })}>
              <CheckCircle size={20}/>
              Conteúdo Liberado
            </span>
          ) : (
            <span className="text-sm text-orange-500 font-medium flex items-center gap-2">
              <Lock size={20}/>
              Em breve
            </span>
          )}

          <span className={classNames('text-xs rounded px-2 py-[0.125rem] text-white border font-bold', {
            'border-white': isActiveLesson,
            'border-green-300': !isActiveLesson
          })}>
            {props.type === 'live' ? 'AO VIVO' : 'AULA PRÁTICA'}
          </span>
        </header>

        {isActiveLesson && (
          <div
            className='w-[0.859rem] h-[0.859rem] bg-green-500 absolute self-center left-[-0.45rem] rounded-sm rotate-45'>
          </div>
        )}

        <strong className={classNames('mt-5 block', {
          'text-white': isActiveLesson,
          'text-gray-200': !isActiveLesson
        })}>
          {props.title}
        </strong>
      </div>

    </Link>
	)
}