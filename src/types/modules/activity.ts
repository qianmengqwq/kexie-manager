interface Activity {
  activityid?: number
  status?: number
  purl?: string
  holdtime?: string
  content?: string
  college?: string
  createtime?: string
  title: string
  signupdeadline: string
  addressonline: string
  addressoffline: string
  speaker: string
  qqgroup: string
  totalnumber: number | undefined
  totalvipnumber: number | undefined
  totalnotvipnumber: number | undefined
}

export type { Activity }
