export type AwardDetails = {
  label?: string
  count: number
  awardItemId?: number
  image?: string
}
export type Code = {
  id?: number
  code: string
  status: 'active' | 'inactive'
  upVote: number
  downVote: number
  awardDetails: AwardDetails[]
}

export type AwardItem = {
  id: number
  label: string
  image: string
  application: string
}
