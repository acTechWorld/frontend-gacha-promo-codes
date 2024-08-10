export type AwardDetails = {
  label: string
  count: number
}
export type Code = {
  code: string
  status: 'active' | 'inactive'
  awardDescription: string
  upVote: number
  downVote: number
  awardDetails: AwardDetails[]
}
