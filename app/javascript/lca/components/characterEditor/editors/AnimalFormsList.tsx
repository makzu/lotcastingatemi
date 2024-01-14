import { Link } from 'react-router-dom'

import type { Form } from '@/types'

const animalFormsList = (forms: Form[]) =>
  forms
    .map((f, i) =>
      f.qc_id ? (
        <Link key={i} to={`/qcs/${f.qc_id}`} style={{ color: 'inherit' }}>
          {f.form}
        </Link>
      ) : (
        f.form
      ),
    )
    .join(', ')

export default animalFormsList
