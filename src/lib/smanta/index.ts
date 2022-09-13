import { Schedules } from "../schedules"

import { X_MIPA_1 } from "./X-MIPA-1"
import { X_MIPA_2 } from "./X-MIPA-2"
import { X_IPS_1 } from "./X-IPS-1"
import { X_IPS_2 } from "./X-IPS-2"

import { XI_MIPA_1 } from "./XI-MIPA-1"
import { XI_MIPA_2 } from "./XI-MIPA-2"
import { XI_MIPA_3 } from "./XI-MIPA-3"
import { XI_IPS_1 } from "./XI-IPS-1"
import { XI_IPS_2 } from "./XI-IPS-2"

import { XII_MIPA_1 } from "./XII-MIPA-1"
import { XII_MIPA_2 } from "./XII-MIPA-2"
import { XII_IPS_1 } from "./XII-IPS-1"
import { XII_IPS_2 } from "./XII-IPS-2"

export const smantaSchedules = new Schedules()

X_MIPA_1(smantaSchedules)
X_MIPA_2(smantaSchedules)
X_IPS_1(smantaSchedules)
X_IPS_2(smantaSchedules)

XI_MIPA_1(smantaSchedules)
XI_MIPA_2(smantaSchedules)
XI_MIPA_3(smantaSchedules)
XI_IPS_1(smantaSchedules)
XI_IPS_2(smantaSchedules)

XII_MIPA_1(smantaSchedules)
XII_MIPA_2(smantaSchedules)
XII_IPS_1(smantaSchedules)
XII_IPS_2(smantaSchedules)
