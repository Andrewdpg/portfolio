import { ListItem, ListItemIcon, ListItemText } from '@mui/material'
import React from 'react'

type PListItemProps = {
  onClick: () => void
  icon?: React.ReactNode
  primary: string
}

const PListItem: React.FC<PListItemProps> = ({ icon, onClick, primary }) => {
  return (
    <ListItem
      onClick={() => onClick()}
      className="hover:bg-app-main/20 cursor-pointer"
    >
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText primary={primary} sx={{ whiteSpace: 'nowrap' }} />
    </ListItem>
  )
}

export default PListItem
