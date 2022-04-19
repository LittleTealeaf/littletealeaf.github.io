import libs.temp as Temp


def incrementCounter(*path):
    def iterate(dictionary,path):
        if len(path) > 1:
            if path[0] not in dictionary:
                dictionary[path[0]] = {}
            iterate(dictionary[path[0]],path[1:])
        else:
            if path[0] not in dictionary:
                dictionary[path[0]] = 0
            dictionary[path[0]] += 1

        return dictionary
    analytics = Temp.get('analytics')
    if analytics == None:
        Temp.store('analytics',iterate({},path))
    else:
        Temp.store('analytics',iterate(analytics,path))
