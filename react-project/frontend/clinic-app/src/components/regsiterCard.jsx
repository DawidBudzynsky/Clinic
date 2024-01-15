import { Col } from "react-bootstrap"
export default function RegisterCard({ handleOpen }) {

  return (
    <Col className='text-center col-4 p-0'>
      <div className='gradientStyle bg-success h-100 rounded-end d-flex flex-column align-items-center justify-content-center px-5'>
        <h3 style={{ fontSize: '3em', whiteSpace: 'nowrap', color: 'white' }}>New Here?</h3>
        <p style={{ color: 'white' }}>Are you ready to revolutionize your clinic?</p>
        <p style={{ color: 'white' }}>Sign up now and elevate your practice by harnessing the power of top-tier software solutions.</p>
        <div className="text-center mb-3">
          <button
            className='whiteButton bg-white text-black'
            variant="secondary"
            type="button"
            onClick={handleOpen}
          >
            Sign up
          </button>
        </div>
      </div>
    </Col>
  )
}

