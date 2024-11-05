const Mask = {
    toInitials(fullName: string | undefined) {
        if (!fullName) return 'AN'
        const formmated = fullName.split(' ')
        const initials = formmated.map((word) => word.charAt(0).toUpperCase())
        return initials.join('')
    },
}

export default Mask
