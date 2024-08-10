export type AwardDetails = {
  label: string
  count: number
}
export type Code = {
  id?: number
  code: string
  status: 'active' | 'inactive'
  awardDescription: string
  upVote: number
  downVote: number
  awardDetails: AwardDetails[]
}
