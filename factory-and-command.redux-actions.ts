// factory + command example: Redux action creators
// creator functions are factories
// actions themselves are commands
export function assignSkill(skillId: string, initialSkillLevel: number): AssignSkill {
  return {
    type: ASSIGN_SKILL,
    payload: {
      skillId,
      initialSkillLevel,
    }
  };
}

export function deleteSkill(skillId: string): DeleteSkill {
  return {
    type: DELETE_SKILL,
    payload: {
      skillId,
    }
  };
}

export function setMainSkill(skillId: string): SetMainSkill {
  return {
    type: SET_MAIN_SKILL,
    payload: {
      skillId,
    },
  };
}

export function rateSkill(skillId: string, skillLevel: number): RateSkill {
  return {
    type: RATE_SKILL,
    payload: {
      skillId,
      skillLevel,
    },
  };
}

// legacy thunk action creators
export function fetchUserData(): FetchUserData {
  return {
    type: FETCH_USER_DATA,
  };
}

export function fetchUserDataSuccess(data: UserData): FetchUserDataSuccess {
  return {
    type: FETCH_USER_DATA_SUCCESS,
    payload: data,
  };
}

export function fetchUserDataError(error: UserDataError): FetchUserDataError {
  return {
    type: FETCH_USER_DATA_ERROR,
    payload: error,
  };
}
