from datetime import date, datetime
from dateutil import relativedelta

def time_since_birthday():
    delta = relativedelta.relativedelta(
        date.today(), datetime.strptime("05/28/2002", "%m/%d/%Y")
    )
    return {"y": delta.years, "m": delta.months, "d": delta.days}
