import CloseModalBtn from "./CloseModalBtn";
import { Api } from "../../axios"

const DeleteDirectoryModal = ({ showModal, setShowModal, id, refresh, setRefresh }) => {

	const delStaff = async () => {
		setShowModal(false)
		await Api.delete(`visitor/directory/${id}`).then((res) => {
			console.log(res);
			window.location.reload
			setRefresh(true)
		})
	}

	return (
		<div className={`${showModal ? 'modal' : 'hidden'} `}>
			<div className="relative modal--content flex items-center justify-center">
				<CloseModalBtn setShowModal={setShowModal} />

				<div className="h-max w-max p-2 text-center">
					<p className="mb-6 text-black text-xl">
						Are you sure you want to delete this visitor?
					</p>
					<div className="flex justify-between max-w-[150px] mx-auto capitalize">
						<button className="text-white px-4 py-2 bg-green rounded-md capitalize" onClick={() => delStaff()}>
							yes
						</button>
						<button className="text-white px-4 py-2 bg-darkred rounded-md capitalize" onClick={() => setShowModal(false)}>
							no
						</button>
					</div>
				</div>

			</div>
		</div>
	);
};

export default DeleteDirectoryModal;
