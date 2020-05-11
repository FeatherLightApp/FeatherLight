const useDateConversion = () => {
    function epochToHuman (t: number) {
        const d = new Date(t * 1000)
        return `${d.getDate()}/${d.getMonth()+1}/${d.getFullYear()} at ${d.getHours()}:${d.getMinutes() < 10 ? 0: ''}${d.getMinutes()}`
    }

    return {
        epochToHuman
    }
}

export default useDateConversion