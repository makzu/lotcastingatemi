import { Link } from 'react-router-dom'

import type { Form } from '@lca/types/index.ts'

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
    .reduce((accu, curr, i) => (i === 0 ? [curr] : [...accu, ', ', curr]), [])

export default animalFormsList
