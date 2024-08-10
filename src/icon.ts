import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faThumbsUp as faThumbsUpSolid,
  faThumbsDown as faThumbsDownSolid,
  faXmark
} from '@fortawesome/free-solid-svg-icons'
import { faThumbsUp, faThumbsDown, faCircleXmark } from '@fortawesome/free-regular-svg-icons'

// Add icons to the library
library.add(faThumbsDown, faThumbsDownSolid, faThumbsUp, faThumbsUpSolid, faCircleXmark, faXmark)

// Export FontAwesomeIcon component for global use
export { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
