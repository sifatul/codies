import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useRef } from 'react';
import { getAnalytics, logEvent } from 'firebase/analytics';
import { boolean } from 'yup/lib/locale';

export default function AlertDialog() {
  const [open, setOpen] = React.useState(false);
  const timeoutRef: { current: NodeJS.Timeout | null } = useRef(null)



  const handleClose = React.useCallback((vote: string) => {

    const analytics = getAnalytics();
    logEvent(analytics, `Idea preference voted: ${vote}`);
    setOpen(false)
    localStorage.setItem('voteTaken', 'true')


  }, [])
  React.useEffect(() => {
    const position = localStorage.getItem('voteTaken')
    if (position) return
    timeoutRef.current = setTimeout(() => {
      setOpen(true);

    }, 30000)

    return () => clearTimeout(timeoutRef.current as NodeJS.Timeout)
  }, [])

  return (
    <div>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Do you find this service useful?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            1. build a digital resume for free <br />
            2. auto sync with technological platforms like Github, Leetcode etc.  <br />
            3. get exposed to local and international hiring organization
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose('No')}>No</Button>
          <Button onClick={() => handleClose('Yes')} autoFocus>
            Yes!
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
